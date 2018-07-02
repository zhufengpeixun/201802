import * as Types from '../../action-types'

export let getSavour = (old, savour) => {
    return {
        type: Types.CHANGE_SAVOUR,
        savour: {
            list: [...old, ...savour]
        }
    }
};

export default {
    getSavour
}


