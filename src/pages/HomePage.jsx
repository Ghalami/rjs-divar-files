import { useQuery } from "@tanstack/react-query";
import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";

const style = { display: "flex" };

function HomePage() {
  const { data: posts, isPending: postsPending } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts,
  });

  const { data: categories, isPending: categoriesPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  return (
    <>
      {postsPending || categoriesPending ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
