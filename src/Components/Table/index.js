import React from "react";
import TableHeader from "./TableHeader";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';



const TableWrapper = ({ tableTitle, tableOptions, children, loading }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#358EED', width: '97%', borderRadius: '0.5rem', padding: '12px 8px', alignSelf: 'center', zIndex: '2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {tableTitle}
                    </div>
                    <div>
                        {tableOptions}
                    </div>
                </div>
            </div>
            <div style={{ background: 'white', borderRadius: '0.5rem', marginTop: '-30px', paddingTop: '40px' }}>
                {loading && <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>}
                {!loading && <>{children}</>}
            </div>
        </div>
    )
}

export default TableWrapper;
