export interface PathOption {
  id: string;
  title: string;
  description: string;
  features: string[];
  target: string;
}

export interface PathComparison {
  feature: string;
  path1: boolean | string;
  path2: boolean | string;
}
