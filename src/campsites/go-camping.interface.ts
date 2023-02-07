export interface Item {
  contentId: string;
  facltNm: string;
  lineIntro: string;
}

export interface Items {
  item: Item[];
}

export interface Body {
  items: Items;
}

export interface Response {
  body: Body;
}

export interface Root {
  response: Response;
}
