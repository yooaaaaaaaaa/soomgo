import React from "react";

const MainPageWrapper = ({children}) => {
    return(
        <div className = 'PostWrapper'>
            {children} {/*this.props.children*/}
        </div>
    )
};

export default MainPageWrapper;
