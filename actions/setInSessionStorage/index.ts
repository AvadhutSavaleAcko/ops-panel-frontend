export const setInSessionStorage = (props) => {
    const {key, value} = props
    try {
        (sessionStorage.setItem(key,value))
      } catch (e) {
        console.log(e);
      }

}