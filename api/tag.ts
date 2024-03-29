import { PromiseApi } from "../types";
import { AccountForm, IBuy } from "../types/account";
import { IAddTag, IDeleteMulti, IUpdateTag } from "../types/tag";
import axiosAuthClient from "./axiosAuthClient";
import axiosClient from "./axiosClient";
import axiosAudit from "./axiosAudit";

interface ITag {
  type: string;
  game: string;
}

interface FormCreateSamePrice {
  name: string;
  title: string;
  cost: number;
  username: string;
  password: string;
  type: string;
  image: string;
  code: string;
  gameSlug: string;
}
interface FormEditSamePrice {
  name: string;
  cost: number;
  image: string;
  code: string;
}
const tagApi = {
  getTag(params: ITag): Promise<PromiseApi> {
    const url = `/tag?type=${params.type}&game=${params.game}`;
    return axiosClient.get(url);
  },
  getGame(): Promise<PromiseApi> {
    const url = `/tag?type=GAME`;
    return axiosClient.get(url);
  },
  addTag(params: IAddTag): Promise<PromiseApi> {
    const url = `/tag/create`;
    return axiosAudit.post(url, params);
  },
  getTagById(id: string): Promise<PromiseApi> {
    const url = `/tag/${id}`;
    return axiosAudit.get(url);
  },
  updateTag(id: string, params: IUpdateTag): Promise<PromiseApi> {
    const url = `/tag/update/${id}`;
    const { content, ...result } = params;
    return axiosAudit.patch(url, result);
  },
  getAccountWithPage(params: AccountForm): Promise<PromiseApi> {
    const handleLimitPrice = () => {
      if (params.startPrice && params.endPrice)
        return `startPrice=${params.startPrice}&endPrice=${params.endPrice}`;
      if (params.startPrice && Boolean(!params.endPrice))
        return `startPrice=${params.startPrice}`;
      if (Boolean(!params.startPrice) && params.endPrice)
        return `endPrice=${params.endPrice}`;
      return `startPrice=0`;
    };
    const isSold = () => {
      if (params.isSold !== null && params.isSold !== undefined) {
        return `isSold=${params.isSold}`;
      } else return "";
    };

    const game = () => {
      if (!params.game) {
        return `game=genshin-impact`;
      } else {
        return `game=${params.game}`;
      }
    };
    const url = `/account-get?limit=${params.limit}&offset=${
      params.offset
    }&weapon=${params.weapon}&character=${params.character}&server=${
      params.server
    }&sort=${params.sort}&queryString=${
      params.queryString
    }&${handleLimitPrice()}&${isSold()}&${game()}&type=${
      params.type
    }&vipToNew=true&arForm=${params.arFrom}&arTo=${params.arTo}`;
    return axiosClient.get(url);
  },
  getAccount(params: AccountForm): Promise<PromiseApi> {
    const handleLimitPrice = () => {
      if (params.startPrice && params.endPrice)
        return `startPrice=${params.startPrice}&endPrice=${params.endPrice}`;
      if (params.startPrice && Boolean(!params.endPrice))
        return `startPrice=${params.startPrice}`;
      if (Boolean(!params.startPrice) && params.endPrice)
        return `endPrice=${params.endPrice}`;
      return `startPrice=0`;
    };
    const isSold = () => {
      if (params.isSold !== null && params.isSold !== undefined) {
        return `isSold=${params.isSold}`;
      } else return "";
    };

    const game = () => {
      if (!params.game) {
        return `game=genshin-impact`;
      } else {
        return `game=${params.game}`;
      }
    };
    const url = `/account-get?limit=${params.limit}&offset=${
      params.offset
    }&weapon=${params.weapon}&character=${params.character}&server=${
      params.server
    }&sort=${params.sort}&queryString=${
      params.queryString
    }&${handleLimitPrice()}&${isSold()}&${game()}&type=${params.type}`;

    return axiosClient.get(url);
  },
  refundAccount(id: string): Promise<PromiseApi> {
    const url = `/account/refund/${id}`;
    return axiosAudit.patch(url);
  },

  addAccount(params: FormData): Promise<PromiseApi> {
    const url = `/account/create`;
    return axiosAuthClient.post(url, params);
  },
  deleteAccount(id: string): Promise<PromiseApi> {
    const url = `/account/${id}`;
    return axiosAuthClient.delete(url);
  },
  getAccountById(id: string): Promise<PromiseApi> {
    const url = `/account-get/details?id=${id}`;
    return axiosAuthClient.get(url);
  },
  updateAccount(id: string, params: FormData): Promise<PromiseApi> {
    const url = `/account/${id}`;
    return axiosAuthClient.patch(url, params);
  },
  getAccountBySlug(slug: string): Promise<PromiseApi> {
    const url = `/account-get/details?slug=${slug}`;
    return axiosClient.get(url);
  },
  getAccountByListID(listID: string): Promise<PromiseApi> {
    const url = `/account-get/wish-list?ids=${listID}`;
    return axiosClient.get(url);
  },
  buyAccount(params: IBuy): Promise<PromiseApi> {
    const url = `/account/buy-multi`;
    return axiosAudit.patch(url, params);
  },
  deleteMultiAccount(params: IDeleteMulti): Promise<PromiseApi> {
    const url = `/account/delete-multi-account`;
    return axiosAudit.patch(url, params);
  },
  addRerollAccount(file: FormData): Promise<PromiseApi> {
    const url = `/account-same-price/import`;
    return axiosAudit.post(url, file);
  },
  addOneRerollAccount(data: FormCreateSamePrice): Promise<PromiseApi> {
    const url = `/account-same-price/create`;
    return axiosAudit.post(url, {
      name: data.name,
      title: data.title,
      username: data.username,
      password: data.password,
      cost: data.cost,
      code: data.code,
      type: data.type,
      image: data.image,
      gameSlug: data.gameSlug,
    });
  },
  getOneRerollAccountById(slug: string): Promise<PromiseApi> {
    const url = `/account-same-price/get-one/${slug}`;
    return axiosAudit.get(url);
  },
  editOneRerollAccount(
    slug: string,
    data: FormEditSamePrice
  ): Promise<PromiseApi> {
    const url = `/account-same-price/update/${slug}`;
    return axiosAudit.put(url, {
      name: data.name,
      cost: data.cost,
      code: data.code,
      image: data.image,
    });
  },
  getRerollAccount(
    type: string,
    limit: number,
    offset: number,
    game: string
  ): Promise<PromiseApi> {
    const url = `/account-same-price/get-all?limit=${limit}&offset=${offset}&type=${type}&isSold=false&game=${game}`;
    return axiosAudit.get(url);
  },
  getRerollAccountForAdmin(
    type: string,
    limit: number,
    offset: number,
    sold: boolean,
    search: string,
    game?: string
  ): Promise<PromiseApi> {
    const gameParams = () => {
      if (!game) {
        return `game=genshin-impact`;
      } else {
        return `game=${game}`;
      }
    };

    const url = `/account-same-price/get-all-by-admin?limit=${limit}&offset=${offset}&type=${type}&isSold=${sold}&search=${search}&${gameParams()}`;
    return axiosAudit.get(url);
  },
  deleteRerollAccount(param: any): Promise<PromiseApi> {
    const url = `/account-same-price/delete-multi-account`;
    return axiosAudit.patch(url, param);
  },
  buyRerollAccount(param: any): Promise<PromiseApi> {
    const url = `/account-same-price/buy-multi`;
    return axiosAudit.patch(url, param);
  },

  getAccountByAdmin(params: AccountForm): Promise<PromiseApi> {
    const handleLimitPrice = () => {
      if (params.startPrice && params.endPrice)
        return `startPrice=${params.startPrice}&endPrice=${params.endPrice}`;
      if (params.startPrice && Boolean(!params.endPrice))
        return `startPrice=${params.startPrice}`;
      if (Boolean(!params.startPrice) && params.endPrice)
        return `endPrice=${params.endPrice}`;
      return `startPrice=0`;
    };
    const isSold = () => {
      if (params.isSold !== null && params.isSold !== undefined) {
        return `isSold=${params.isSold}`;
      } else return "";
    };

    const game = () => {
      if (!params.game) {
        return `game=genshin-impact`;
      } else {
        return `game=${params.game}`;
      }
    };
    const userParams = () => {
      if (!params.createUser) {
        return ``;
      } else {
        return `&createUser=${params.createUser}`;
      }
    };

    const typeParams = () => {
      if (!params.type) {
        return ``;
      } else {
        return `&type=${params.type}`;
      }
    };

    const url = `/account-get/by-admin?limit=${params.limit}&offset=${
      params.offset
    }&weapon=${params.weapon}&character=${params.character}&server=${
      params.server
    }&sort=${params.sort}&queryString=${
      params.queryString
    }&${handleLimitPrice()}&${isSold()}&${game()}${userParams()}${typeParams()}`;
    return axiosAuthClient.get(url);
  },
  updateDayMultiAccount(param: string[]): Promise<PromiseApi> {
    const url = `/account/update-list-acc`;
    return axiosAudit.post(url, {ids:param});
  },
};
export default tagApi;
