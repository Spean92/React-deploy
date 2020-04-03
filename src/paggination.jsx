import React from "react";
import classNames from 'classnames';

export const Paggination = (props) => {
    const {total_pages, current_page, changePage} = props;
    return (
        <div className="row">
            <p className="col">Total pages {total_pages}</p>
            <div className="w-100"/>
            <a role="button"
               href="#"
               className={classNames(`col btn btn-primary`, {'disabled': current_page <= 1})}
               aria-disabled={current_page <= 1}
               onClick={(e) => changePage(`-`)}
            >{`<`}</a>
            <span className="col align-self-center text-center">{current_page}</span>
            <a role="button"
               href="#"
               className={classNames(`col btn btn-primary`, {'disabled': current_page >= total_pages})}
               onClick={(e) => changePage(`+`)}
            >></a>
        </div >
    )
}