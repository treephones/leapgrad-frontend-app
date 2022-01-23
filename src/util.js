export let beautifyTime = (dt) => {
    let date = new Date(dt);
    let hrs = date.getHours();
    let hem = hrs >= 12 ? 'PM' : 'AM';
    let mins = date.getMinutes();
    mins = mins < 10 ? `0${mins}` : mins;
    hrs %= 12;
    hrs = hrs ? hrs : 12;
    return `${hrs}:${mins} ${hem}`;
}

export let key = () => Math.random()*Math.random()+Math.random();

