import {useState} from "react"

const BButton = () => {
    const styles = {
        backgroundColor: 'BLUE',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '5px'
    }

    // create state instance for the date you want to keep track of
    // const [getter, setter] = useState(defaultValue) 
  return (
    <button style={styles.button}>Button</button>


  )
}
export default BButton