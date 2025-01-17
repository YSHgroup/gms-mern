
let navigate: (path: string) => void = () => {};

export const navigateTo = (path: string) => {
    if(navigate !=undefined ) {
        navigate(path);
    }
}

export const setNavigate = (nav: (path: string) => void) => {
    navigate = nav;
}