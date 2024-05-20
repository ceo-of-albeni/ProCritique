import classes from "./backpage.module.css";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

const BackPage = () => {
  const [page, setPage] = useState(1);

  const handlePage = (e, p) => {
    setPage(p);
  };

  const itemsOnPage = 8;

  const count = 3;

  // function currentData() {
  //   const begin = (page - 1) * itemsOnPage;
  //   const end = begin + itemsOnPage;
  //   return products.slice(begin, end);
  // }

  return (
    <div className={classes.theMainestDiv}>
      <div className={classes.filAndSr}>
        <a href="#">
          <div className={classes.icon}>
            <i className="fa-solid fa-filter fa-2xl"></i>
          </div>
        </a>
        <a href="#">
          <div className={classes.icon} id={classes.search}>
            <i
              className="fa-solid fa-magnifying-glass fa-2xl"
              id={classes.search}></i>
          </div>
        </a>
      </div>
      <div className={classes.mainDiv}>
        <div className={classes.mainDiv2}>
          <div className={classes.secondDiv}>
            <Card className={classes.cards} />
            <Card className={classes.cards} />
            <Card className={classes.cards} />
          </div>
          <Pagination count={count} page={page} onChange={handlePage} />
        </div>
      </div>
    </div>
  );
};

export default BackPage;
