document.addEventListener("DOMContentLoaded", function () {
    const bingoContainer = document.getElementById('bingo-container');
    const columns = ['B', 'I', 'N', 'G', 'O'];

    // Función para generar números únicos para una columna específica
    function generateBingoNumbers(letter) {
        const ranges = {
            B: [1, 15],
            I: [16, 30],
            N: [31, 45],
            G: [46, 60],
            O: [61, 75]
        };
        const [min, max] = ranges[letter];
        const numbers = new Set();
        while (numbers.size < 5) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(num);
        }
        return Array.from(numbers);
    }

    // Función para generar una tarjeta de Bingo
    function generateBingoCard() {
        const card = document.createElement('div');
        card.className = 'col';
        let cardHTML = `
            <div class="card">
                <div class="card-header header-bingo">
                    ${columns.map(col => `<span>${col}</span>`).join('')}
                </div>
                <div class="card-body">
                    ${columns.map(col => {
                        const cellNumbers = generateBingoNumbers(col);
                        return cellNumbers.map(num => `<div class="cell">${num}</div>`).join('');
                    }).join('')}
                </div>
            </div>
        `;
        card.innerHTML = cardHTML;
        return card;
    }

    // Función para colorear columnas de tarjetas de manera secuencial y marcar la X en las tarjetas deseadas
    function colorSequentialColumns() {
        const cards = document.querySelectorAll('.card');
        const colors = ['#ffcc00', '#99ff99', '#ff9999', '#ccccff', '#ffff99'];

        cards.forEach((card, index) => {
            const cells = card.querySelectorAll('.card-body .cell');
            
            // Colorear columnas secuencialmente
            if (index < colors.length) {
                const columnIndex = index;
                for (let iterar = 0; iterar < 5; iterar++) {
                    cells[iterar * 5 + columnIndex].style.backgroundColor = colors[columnIndex];
                }
            }

            // Marcar la X en la séptima tarjeta (índice 6)
            if (index === 6) {
                const xColor = '#ff0000';
                const size = 5;
                for (let iterar = 0; iterar < size; iterar++) {
                    cells[iterar * size + iterar].style.backgroundColor = xColor; // Diagonal principal
                    cells[iterar * size + (size - 1 - iterar)].style.backgroundColor = xColor; // Diagonal inversa
                }
            }

            // Marcar cuatro celdas con X en la octava tarjeta (índice 7)
            if (index === 7) {
                const xColor = '#ff0000';
                // Celdas para marcar como una X
                const xCells = [
                    0, 4, 10, 12, 14, 16, 18,   // Diagonal principal
                    6, 8, 2, 20, 22, 24,       // Diagonal inversa   
                ];
                xCells.forEach(cellIndex => {
                    cells[cellIndex].style.backgroundColor = xColor;
                });
            }
        });
    }

    // Genera 8 tarjetas
    for (let iterar = 0; iterar < 8; iterar++) {
        bingoContainer.appendChild(generateBingoCard());
    }

    // Aplica colores y marcas
    colorSequentialColumns();
});