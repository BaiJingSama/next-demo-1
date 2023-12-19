/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.png"{
  const value: string;
  export default value
}

declare module "lib/*"

type Post = {
  id: string;
  date: string;
  title: string;
  content:string;
  htmlContent:string
}