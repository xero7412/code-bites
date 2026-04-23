const Form = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        console.log('clicked', e.get('firstName'))
    }
    return (
        <div>
            Form Component
            <br/>
            <br/>
            <form onSubmit={onSubmitHandler}>
                <input name="firstName" placeHolder="enter name"/>
                <br/>
                <input name="number" placeHolder="enter number"/>
                <br/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Form;

