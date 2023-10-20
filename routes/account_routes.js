const AccountRoutes = (apiVersion, servicePath = 'account') => {
    return {
        get WELCOME() {
            return `${apiVersion}/${servicePath}/welcome`
        },
        get LOGIN() {
            return `${apiVersion}/${servicePath}/login`
        },
        get REGISTER() {
            return `${apiVersion}/${servicePath}/register`
        }
    }
}

export default AccountRoutes;