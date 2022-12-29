import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/getCategories";

import classes from "./categories.module.css";
import Container from "./utils/Container";

const Categories = () => {
  const [categories, setCategories] = useState<String[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();
      setCategories(Object.keys(data));
    };
    fetchCategories();
  }, []);

  return (
    <Container>
      <h1>Trivia App</h1>
      <div className={classes.categories}>
        {categories.map((category) => (
          <Link key={`${category}`} to={`/categories/${category}`} className={classes.category}>
            {category}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
