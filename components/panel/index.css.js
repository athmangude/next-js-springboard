export default ({ theme }) => {
    return `
        background-color: #f0f0f0;
        border: solid 1px #d9d9d9;
        padding: 10px;
        border-radius: 4px;

        code {
            font-size: 15px;
            margin: 0 5px;
            color: ${theme.palette.secondary.main}
        }
    `;
}