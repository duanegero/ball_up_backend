const logError = async (error: unknown) => {
    if(error instanceof Error){
        console.error(error.message, error.stack)
    }else{
        console.error("An unknow error occurred", error)
    }
    
}

export {logError}