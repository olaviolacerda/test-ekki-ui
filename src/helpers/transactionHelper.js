const transactionStatus = (status) => {
    const options = [
        { text: 'Pendente', color: '#fda06b', bg: '#ffece1' },
        { text: 'Realizada', color: '#00ca9b', bg: '#bdf8ea' },
        { text: 'Cancelada', color: '#ff5d70', bg: '#ffe0e4' }
    ]

    return options[status];
}


export default transactionStatus