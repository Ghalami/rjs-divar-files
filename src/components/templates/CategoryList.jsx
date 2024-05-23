import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import Loader from "./../modules/Loader";
import styles from "./CategoryList.module.css";
import api from "../../configs/api";

function CategoryList() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log({ data, isPending });

  const deleteHandler = async (categoryId) => {
    await api.delete(`/category/${categoryId}`);
    refetch();
  };

  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => deleteHandler(i._id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
