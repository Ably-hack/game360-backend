const AccountRoutes = (apiVersion, servicePath = 'account') => {
    return {
        get LOGIN() {
            return `${apiVersion}/${servicePath}/login`
        },
        get REGISTER() {
            return `${apiVersion}/${servicePath}/register`
        },
        get CONNECT() {
            return `${apiVersion}/${servicePath}/connect`
        }
    }
}

export default AccountRoutes;