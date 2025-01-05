import React, { useEffect } from 'react';

function AttendanceGrid({attendaceList}) {

    useEffect(()=> {
        const userList=getUniqueRecord();

    }, [attendaceList])

    const getUniqueRecord = () =>{
        const uniqueRecord = [];
        const existingUser = new Set();

        attendaceList.forEach(record => {
            if(!existingUser.has(record.studentId)){
                existingUser.add(record.studentId);
                uniqueRecord.push(record);
            }
            
        });

        return uniqueRecord;

    }
    return (
        <div>
            AttendanceGrid Component
        </div>
    );
}

export default AttendanceGrid;