import { useEffect, useRef, useState } from 'react';
import useObserve from './useObserve';

export interface MoreDataFn<T> {
  (page: string, count: string): Promise<T[]>;
}

/**
 * 무한 스크롤 후크를 사용해서 page를 마다 데이터를 가져오게 하는 후크
 * @param initPage page의 초기 값
 * @param initCount count의 초기 값
 * @param moreData 데이터를 가져올 함수
 * @returns
 */
const usePage = <T, MoreDataFn extends (page: string, count: string) => Promise<T[]>>(
  initPage: string,
  initCount: string,
  moreData: MoreDataFn
) => {
  const [page, setPage] = useState(initPage);
  const [count, setCount] = useState(initCount);
  const [data, setData] = useState<T[]>([]);
  const endOfPage = useRef<HTMLDivElement>(null);

  const callbackObserved = () => {
    setPage((p) => (+p + 1).toString());
  };

  const { observe, unobserve } = useObserve(callbackObserved);

  if (endOfPage.current) observe(endOfPage.current);

  useEffect(() => {
    (async () => {
      const newData = await moreData(page, count);
      const filteredData = newData.filter((d) => !data.includes(d));

      setData((d) => [...d, ...filteredData]);
    })();
  }, [page, count]);

  return { data, endOfPage, unobserve, setPage, setCount };
};

export default usePage;
