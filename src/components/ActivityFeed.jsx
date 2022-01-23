import { useState, useEffect } from "react";
import LoadingState from "./LoadingState.jsx";
import CallTab from "./CallTab.jsx";
import CallDateSplitter from "./CallDateSplitter.jsx";
import { key } from "../util.js";

const ActivityFeed = ({ setShowDetail, setSelectedCall, showDetail, showArchived }) => {
    let [calls, setCalls] = useState([]);
    let [loading, setLoading] = useState(true);

    let implementDates = (list) => {
        //sort calls by date
        for(let i = 0; i < list.length; ++i) {
            for(let j = i; j < list.length; ++j) {
                if(new Date(list[i].created_at) < new Date(list[j].created_at)) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp; 
                }
            }
        }
        let tlist = list;
        if(showArchived) {
            tlist = list.filter(e => e.is_archived);
            if(tlist.length == 0) {
                return [["No archived calls."]];
            }
        }
        else {
            tlist = list.filter(e => !e.is_archived);
            if(tlist.length == 0) {
                return [["No recent calls."]]
            }
        }
        //incorporate dates
        let alldates = tlist.map(elem => elem.created_at.split('T')[0]);
        let nl = [[alldates[0]]];
        for(let i = 0; i < tlist.length-1; ++i) {
            nl.push(tlist[i]);
            if(alldates[i] != alldates[i+1]) {
                nl.push([alldates[i+1]]);
            }
        }
        nl.push(tlist[tlist.length-1]);
        return nl;
    };

    useEffect(() => {
        fetch('https://aircall-job.herokuapp.com/activities')
        .then(res => res.json())
        .then(callData => {
            setLoading(true);
            setCalls(callData);
            //console.log(calls);
            setLoading(false);
        });
    }, [showArchived, showDetail]);

    return (
        <div id="callList">
        {
            loading 
            ? <LoadingState msg='Loading Calls...' /> 
            : implementDates(calls).map(call => {
                return !call.length //is essentially checking if list item is a call or a date
                ? <CallTab setShowDetail={setShowDetail} 
                setSelectedCall={setSelectedCall} 
                is_archived={call.is_archived} 
                id={call.id} 
                direction={call.direction} 
                time={call.created_at} 
                identifier={call.from} 
                type={call.call_type} 
                key={key()} /> 
                : <CallDateSplitter date={call[0]} key={key()} />
            })
        }
        </div>
    );
}

export default ActivityFeed;