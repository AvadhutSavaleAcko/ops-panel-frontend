interface Actions {
  [key: string]: Array<any>;
}

export interface CommonProps {
  is_visible: boolean;
  payloadData?: any;
  actions?: Actions;
  styles?: object;
  // Not able to use react as this is not served as an package which will install react when being fetch
  // children?: React.ReactNode;
  children?: any;
  id?: string;
  mStyles?: object;
}
