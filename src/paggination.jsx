import React from "react";

export const Paggination = (props) => {
    const {total_pages, current_page, changePage} = props;
    return (
        <div className="row">
            <p className="col">Total pages {total_pages}</p>
            <div className="w-100"></div>
            <a role="button"
               href="#"
               className={`col btn btn-primary ${current_page <= 1 ? "disabled": ""}`}
               aria-disabled={current_page <= 1}
               onClick={(e) => changePage(`-`)}
            >{`<`}</a>
            <span className="col align-self-center text-center">{current_page}</span>
            <a role="button"
               href="#"
               className={`col btn btn-primary ${current_page >= total_pages ? "disabled": ""}`}
               onClick={(e) => changePage(`+`)}
            >></a>
        </div >
    )
}