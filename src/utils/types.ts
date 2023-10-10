export type PageProps = {
  auth: any;
  not?: boolean;
  element?: React.ReactNode;
  path?: string | string[];
  strict?: boolean;
  location?: any;
};

export interface IDelete {
  url: string;
  body?: any;
}

export interface IPost extends IDelete {
  body?: string | object;
}

export type IPatch = IPost;

export type IPut = IPost;

export interface IGet extends IDelete {
  query?: Record<string, any>;
}

export interface IDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type IdentificationTypes =
  | 'national_identity_card'
  | 'drivers_licence'
  | 'voters_card';
