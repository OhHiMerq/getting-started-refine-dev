import { Refine } from "@refinedev/core";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { HeadlessInferencer } from "@refinedev/inferencer/headless";

import { Layout } from "./components/layout";

import "./App.css";
import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "blog_posts",
                        list: "/blog-posts",
                        show: "/blog-posts/show/:id",
                        create: "/blog-posts/create",
                        edit: "/blog-posts/edit/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route index element={<NavigateToResource resource="blog_posts" />} />
                        <Route path="blog-posts">
                            <Route index element={<BlogPostList />} />
                            <Route
                                path="show/:id"
                                element={<BlogPostShow />}
                            />
                            <Route
                                path="edit/:id"
                                element={<BlogPostEdit />}
                            />
                            <Route
                                path="create"
                                element={<BlogPostCreate />}
                            />
                        </Route>
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};
export default App;