const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = 'build-errors.log';
const timestamp = new Date().toISOString();

console.log('🔨 Starting build with error logging...\n');

// Clear previous log
fs.writeFileSync(logFile, `Build Error Log - ${timestamp}\n${'='.repeat(50)}\n\n`);

// Function to log to both console and file
const log = (message, isError = false) => {
  const prefix = isError ? '❌ ' : '✅ ';
  console.log(prefix + message);
  fs.appendFileSync(logFile, prefix + message + '\n');
};

// Step 1: TypeScript check
console.log('📝 Running TypeScript check...');
exec('npx tsc --noEmit --pretty', (error, stdout, stderr) => {
  if (error) {
    log('TypeScript Errors Found:', true);
    fs.appendFileSync(logFile, '\nTypeScript Errors:\n' + '='.repeat(30) + '\n');
    fs.appendFileSync(logFile, stdout + '\n' + stderr + '\n');
    
    // Count errors
    const errorCount = (stdout.match(/error TS/g) || []).length;
    log(`Found ${errorCount} TypeScript errors\n`, true);
  } else {
    log('TypeScript check passed!\n');
  }
  
  // Step 2: ESLint check
  console.log('🎨 Running ESLint check...');
  exec('npx eslint . --ext .js,.jsx,.ts,.tsx --format compact', (error, stdout, stderr) => {
    if (error) {
      log('ESLint Errors Found:', true);
      fs.appendFileSync(logFile, '\nESLint Errors:\n' + '='.repeat(30) + '\n');
      fs.appendFileSync(logFile, stdout + '\n' + stderr + '\n');
      
      // Count errors
      const errorCount = (stdout.match(/error/g) || []).length;
      const warningCount = (stdout.match(/warning/g) || []).length;
      log(`Found ${errorCount} errors and ${warningCount} warnings\n`, true);
    } else {
      log('ESLint check passed!\n');
    }
    
    // Step 3: Attempt build despite errors
    console.log('🚀 Attempting build (with temporary suppressions)...');
    
    // Create temporary next.config.js with suppressions
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    const tempConfig = nextConfig.replace(
      'module.exports = nextConfig;',
      `// TEMPORARY - REMOVE AFTER FIXING ERRORS
nextConfig.typescript = { ignoreBuildErrors: true };
nextConfig.eslint = { ignoreDuringBuilds: true };

module.exports = nextConfig;`
    );
    
    fs.writeFileSync('next.config.temp.js', tempConfig);
    fs.renameSync('next.config.js', 'next.config.backup.js');
    fs.renameSync('next.config.temp.js', 'next.config.js');
    
    // Run build
    exec('npm run build', (error, stdout, stderr) => {
      // Restore original config
      fs.renameSync('next.config.js', 'next.config.temp.js');
      fs.renameSync('next.config.backup.js', 'next.config.js');
      fs.unlinkSync('next.config.temp.js');
      
      if (error) {
        log('Build failed!', true);
        fs.appendFileSync(logFile, '\nBuild Output:\n' + '='.repeat(30) + '\n');
        fs.appendFileSync(logFile, stdout + '\n' + stderr + '\n');
      } else {
        log('Build succeeded (with suppressions)!');
        
        // Log build summary
        console.log('\n📊 Build Summary:');
        console.log('================');
        console.log(`✅ Build completed at: ${new Date().toISOString()}`);
        console.log(`📄 Error log saved to: ${logFile}`);
        console.log('\n⚠️  IMPORTANT: This build used temporary error suppressions!');
        console.log('Fix all errors logged above before deploying to production.\n');
      }
    });
  });
});