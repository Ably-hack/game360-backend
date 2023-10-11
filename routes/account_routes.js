const AccountRoutes = (apiVersion, servicePath = 'account') => {
    return {
        get WELCOME() {
            return `${apiVersion}/${servicePath}/welcome`
        }
    }
}

export default AccountRoutes;