// javaCeL.js — Modificaciones dinámicas para consejoseinf.html
document.addEventListener('DOMContentLoaded', () => {
	const tips = [
		{ id: 1, title: 'Reserva un espacio para reciclar', short: 'Coloca cubos separados en un lugar accesible para facilitar el hábito.', details: 'Un punto fijo para reciclar evita dejar envases mezclados con la basura orgánica. Usa cubos o cajas con etiquetas claras y accesibles para todos en casa.' },
		{ id: 2, title: 'Separa y limpia los envases', short: 'Quita restos orgánicos y aclara envases antes de depositarlos.', details: 'Los envases con restos contaminan el reciclaje. Enjuágalos o sécalos antes de tirarlos al contenedor adecuado.' },
		{ id: 3, title: 'Aprende los colores de los contenedores', short: 'Amarillo: envases; azul: papel y cartón; verde: vidrio; marrón: orgánicos.', details: 'No todos los materiales van en el mismo contenedor. Por ejemplo, las bandejas de cartón van al azul, los briks al amarillo y el vidrio al verde.' },
		{ id: 4, title: 'Productos especiales en puntos limpios', short: 'Lleva pilas, electrónicos y bombillas a puntos limpios.', details: 'Estos productos requieren tratamiento especial: no los tires al contenedor convencional. Busca el punto limpio más cercano o campañas de recogida.' },
		{ id: 5, title: 'Reutiliza bolsas y envases', short: 'Usa bolsas de tela y reutiliza envases siempre que puedas.', details: 'Reducir y reutilizar es tan importante como reciclar. Lleva siempre una bolsa reutilizable y aprovecha envases para almacenaje en casa.' },
		{ id: 6, title: 'Haz compost con restos orgánicos', short: 'Si tienes jardín o plantas, considera una compostera.', details: 'El compostaje transforma restos orgánicos en abono útil para plantas. Evita mezclar plásticos o metales en la compostera.' },
		{ id: 7, title: 'No viertas aceite por el fregadero', short: 'Depósitalo en una botella y llévalo a un punto limpio.', details: 'El aceite es muy contaminante y puede obstruir tuberías. Guarda el aceite usado en una botella y recíclalo en puntos limpios.' }
	];

	const listEl = document.getElementById('tips-list');
	const countEl = document.getElementById('tips-count');
	const searchInput = document.getElementById('searchTips');
	const sortBtn = document.getElementById('sortBtn');

	// Load completed state from localStorage
	const completed = JSON.parse(localStorage.getItem('tipsCompleted') || '{}');

	function renderItems(items) {
		listEl.innerHTML = '';
		items.forEach(t => {
			const col = document.createElement('div');
			col.className = 'col';

			const card = document.createElement('div');
			card.className = 'card h-100 shadow-sm';
			if (completed[t.id]) card.classList.add('border-success');

			const body = document.createElement('div');
			body.className = 'card-body d-flex flex-column';

			const h5 = document.createElement('h5');
			h5.className = 'card-title';
			h5.textContent = t.title;

			const p = document.createElement('p');
			p.className = 'card-text';
			p.textContent = t.short;

			const details = document.createElement('div');
			details.className = 'collapse';
			details.id = `details-${t.id}`;
			const longP = document.createElement('p');
			longP.className = 'mt-2 mb-0 small text-muted';
			longP.textContent = t.details;
			details.appendChild(longP);

			const btnRow = document.createElement('div');
			btnRow.className = 'mt-auto pt-3 d-flex gap-2 align-items-center';

			const toggleBtn = document.createElement('button');
			toggleBtn.type = 'button';
			toggleBtn.className = 'btn btn-sm btn-outline-primary';
			toggleBtn.setAttribute('data-bs-toggle', 'collapse');
			toggleBtn.setAttribute('data-bs-target', `#details-${t.id}`);
			toggleBtn.textContent = 'Ver más';

			const doneBtn = document.createElement('button');
			doneBtn.className = completed[t.id] ? 'btn btn-sm btn-success' : 'btn btn-sm btn-outline-success';
			doneBtn.textContent = completed[t.id] ? 'Hecho' : 'Marcar como hecho';
			doneBtn.type = 'button';
			doneBtn.addEventListener('click', () => {
				completed[t.id] = !completed[t.id];
				localStorage.setItem('tipsCompleted', JSON.stringify(completed));
				renderItems(filterAndSort());
			});

			// Programmatically initialize Bootstrap Collapse for the details element
			if (window.bootstrap && bootstrap.Collapse) {
				// ensure it is instantiated without toggling immediately
				const bsCollapse = new bootstrap.Collapse(details, { toggle: false });
				toggleBtn.addEventListener('click', (e) => {
					e.preventDefault();
					bsCollapse.toggle();
				});
			} else {
				// Fallback: simple class toggle if Bootstrap is not available
				toggleBtn.addEventListener('click', (e) => {
					e.preventDefault();
					details.classList.toggle('show');
				});
			}

			btnRow.appendChild(toggleBtn);
			btnRow.appendChild(doneBtn);

			body.appendChild(h5);
			body.appendChild(p);
			body.appendChild(details);
			body.appendChild(btnRow);
			card.appendChild(body);
			col.appendChild(card);
			listEl.appendChild(col);
		});

		countEl.textContent = `${items.length} consejos`;
	}

	function filterAndSort() {
		const q = searchInput.value.trim().toLowerCase();
		let results = tips.filter(t => (t.title + ' ' + t.short + ' ' + t.details).toLowerCase().includes(q));
		if (sortBtn.dataset.sorted === 'true') {
			results = results.slice().sort((a,b) => a.title.localeCompare(b.title, 'es'));
		}
		return results;
	}

	// Events
	searchInput.addEventListener('input', () => renderItems(filterAndSort()));

	sortBtn.addEventListener('click', () => {
		if (sortBtn.dataset.sorted === 'true') {
			sortBtn.dataset.sorted = 'false';
			sortBtn.textContent = 'Ordenar A→Z';
		} else {
			sortBtn.dataset.sorted = 'true';
			sortBtn.textContent = 'Ordenado';
		}
		renderItems(filterAndSort());
	});

	// Initial render
	renderItems(tips);

	// Small accessibility enhancement: focus search on load
	searchInput.focus();
});
