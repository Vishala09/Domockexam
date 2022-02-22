export function  MapChildrenDetails(UserLogin)  {
    let map = {};
    for(let i=0;i<UserLogin.childrenData.length;i++)
    {
        map[UserLogin.childrenData[i].id]=UserLogin.childrenData[i];
    }
    return {...map}
}