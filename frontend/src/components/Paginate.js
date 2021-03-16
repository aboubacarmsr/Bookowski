import React from "react";
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page }) => {
  return (
    <div className="paginate">
      {[...Array(pages).keys()].map((x) => (
        <Link key={x + 1} style={{ textDecoration: 'none', padding: '0.2em', marginRight: '0.2em',  color: '#000',
            borderBottom: page === x + 1 ? '1px solid #000' : 'none' }} to={`/shop/${x + 1}`}>
             {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default Paginate;
