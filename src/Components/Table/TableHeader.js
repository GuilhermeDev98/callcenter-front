import React from "react";

const TableHeader = (props) => {
    return (
        <div style={{background: '#358EED', width: '100%', borderRadius: '0.5rem', padding: '24px 16px'}}>
            <div style={{color: 'red', fontWeight: 'bold', fontSize: '1.1rem'}}>{props.children}</div>
        </div>
    )
}

export default TableHeader;