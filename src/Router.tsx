import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";



const modules = import.meta.glob("/src/pages/**/*.tsx");
const routes = Object.keys(modules).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "") // prefix削除
  return { path, component: lazy(modules[route] as any) };
});

/**
 * @description react-router-dom을 기반으로 컴포넌트 들의 페이지를 url에 맞게 로드 시키는 부분입니다.
 * @page ./pages
 */

const DynamicRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <Suspense
                fallback={
                  <Box
                    sx={{
                      display: "flex",
                      minHeight: "100vh",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <CircularProgress />
                  </Box>
                }>
                <Component />
              </Suspense>
            }
          />
        );
      })}
      
    </Routes>
  );
};

export default DynamicRouter;