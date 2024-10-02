import { useEffect, useState } from "react";

function useFadeEffect(탭) {
    let [fade, setFade] = useState('');

    useEffect(()=> {
        let a = setTimeout(()=>{setFade('end')}, 100);

        return () => {
            clearTimeout(a);
            setFade('');
        }
    }, [탭])

    return fade;
}

export default useFadeEffect;