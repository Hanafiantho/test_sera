import {useRouter} from "next/router"

export const PathName = () => {
    let router = useRouter()
    let path_name =
        router.pathname.split("/")[router.pathname.split("/").length - 1];
    //   let title = path_name.charAt(0).toUpperCase() + path_name.slice(1);
  
    return path_name;
};