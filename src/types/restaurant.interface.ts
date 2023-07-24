export interface Restaurant {
  access: string;
  address: string;
  band: string;
  barrier_free: string;
  budget: {
    average: string;
    code: string;
    name: string;
  };
  budget_memo: string;
  capacity: number;
  card: string;
  catch: string;
  charter: string;
  child: string;
  close: string;
  coupon_urls: {
    pc: string;
    sp: string;
  };
  course: string;
  english: string;
  free_drink: string;
  free_food: string;
  genre: {
    catch: string;
    code: string;
    name: string;
  };
  horigotatsu: string;
  id: string;
  karaoke: string;
  ktai_coupon: number;
  large_area: {
    code: string;
    name: string;
  };
  large_service_area: {
    code: string;
    name: string;
  };
  lat: number;
  lng: number;
  logo_image: string;
  lunch: string;
  middle_area: {
    code: string;
    name: string;
  };
  midnight: string;
  mobile_access: string;
  name: string;
  name_kana: string;
  non_smoking: string;
  open: string;
  other_memo: string;
  parking: string;
  party_capacity: number;
  pet: string;
  photo: {
    mobile: {
      l: string;
      s: string;
    };
    pc: {
      l: string;
      m: string;
      s: string;
    };
  };
  private_room: string;
  service_area: {
    code: string;
    name: string;
  };
  shop_detail_memo: string;
  show: string;
  small_area: {
    code: string;
    name: string;
  };
  station_name: string;
  sub_genre: {
    code: string;
    name: string;
  };
  tatami: string;
  tv: string;
  urls: {
    pc: string;
  };
  wedding: string;
  wifi: string;
}
export interface RestaurantDB {
  id: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface RestaurantHOTPP {
  shop: [
    {
      access: string;
      address: string;
      band?: string | null;
      barrier_free?: string | null;
      budget?: string | null;
      budget_memo?: string | null;
      capacity?: number | null;
      card?: string | null;
      catch: string;
      charter?: string | null;
      child?: string | null;
      close?: string | null;
      coupon_urls?: {
        pc?: string | null;
        sp?: string | null;
      } | null;
      course?: string | null;
      english?: string | null;
      free_drink?: string | null;
      free_food?: string | null;
      genre: {
        catch: string;
        code?: string | null;
        name: string;
      };
      horigotatsu?: string | null;
      id?: string | null;
      karaoke?: string | null;
      ktai_coupon?: number | null;
      large_area?: {
        code?: string | null;
        name?: string | null;
      } | null;
      large_service_area?: {
        code?: string | null;
        name?: string | null;
      } | null;
      lat: number;
      lng: number;
      logo_image?: string | null;
      lunch?: string | null;
      middle_area?: {
        code?: string | null;
        name?: string | null;
      } | null;
      midnight?: string | null;
      mobile_access?: string | null;
      name?: string | null;
      name_kana?: string | null;
      non_smoking?: string | null;
      open?: string | null;
      other_memo?: string | null;
      parking?: string | null;
      party_capacity?: number | null;
      pet?: string | null;
      photo: {
        mobile?: {
          l?: string | null;
          s?: string | null;
        } | null;
        pc: {
          l: string;
          m: string;
          s: string;
        };
      };
      private_room?: string | null;
      service_area?: {
        code?: string | null;
        name?: string | null;
      } | null;
      shop_detail_memo?: string | null;
      show?: string | null;
      small_area?: {
        code?: string | null;
        name?: string | null;
      } | null;
      station_name?: string | null;
      sub_genre?: {
        code?: string | null;
        name?: string | null;
      } | null;
      tatami?: string | null;
      tv?: string | null;
      urls: {
        pc: string;
      };
      wedding?: string | null;
      wifi?: string | null;
    }
  ];
}
