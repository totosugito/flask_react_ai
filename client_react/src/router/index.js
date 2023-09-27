import {baseURL, isDebug} from "../config"

export function getRouterUrl(key, prefix="/", param={}) {
    let routers = {
        "404": prefix + "error-404",
        "home": prefix + "/",
    }
    return(routers[key])
}

export function getRouterApi(key, param={}) {
    let apis = {
        // "dummy-job-predict": baseURL + "/api/ccdp/predict-json-list",
    }
    let url = apis[key]
    if (isDebug)
        console.log(url)
    return(url)
}