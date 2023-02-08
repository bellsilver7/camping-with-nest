export interface GoCampingBasedList {
  response: Response;
}

export interface Response {
  header: Header;
  body: Body;
}

export interface Body {
  items: Item[];
}

export interface Item {
  contentId: string;
  facltNm: string;
  lineIntro: string;
}

export interface Header {
  resultCode: string;
  resultMsg: string;
}
