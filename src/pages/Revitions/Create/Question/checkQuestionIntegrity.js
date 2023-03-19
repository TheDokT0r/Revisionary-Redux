// Return an array of errors if the question is not valid

const checkQuestionIntegrity = (question, options) => {
    let errors = [];
    if (question.length < 1) {
        errors.push("You must have a question");
    }
    if (options.length < 1) {
        errors.push("You must have at least one option");
    }

    //Check that non of the options are empty
    options.forEach((option) => {
        if (option.length < 1) {
            errors.push("You must have a value for all options");
        }
    });
    
    return errors;
}

export default checkQuestionIntegrity;