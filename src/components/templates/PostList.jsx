import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/user";
import Loader from "./../modules/Loader";
import { sp } from "../../utils/numbers";

import styles from "./PostList.module.css";
import api from "../../configs/api";

function PostList() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });
  const deleteHandler = async (categoryId) => {
    await api.delete(`post/delete/${categoryId}`);
    refetch();
  };
  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data?.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button onClick={() => deleteHandler(post._id)}>حذف</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
