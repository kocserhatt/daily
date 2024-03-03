document.addEventListener("DOMContentLoaded", function () {
    const entryInput = document.getElementById("entryInput");
    const addEntryBtn = document.getElementById("addEntryBtn");
    const entryList = document.getElementById("entryList");

    // Local storage'dan günlük girişlerini al
    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    // Günlük girişlerini ekrana yazdır
    function displayEntries() {
        entryList.innerHTML = "";
        entries.forEach(function (entry, index) {
            const listItem = document.createElement("li");
            listItem.classList.add("entryItem");

            const entryText = document.createElement("span");
            entryText.textContent = entry.text;

            const entryDate = document.createElement("span");
            entryDate.classList.add("entryDate");
            entryDate.textContent = formatTimestamp(entry.timestamp);

            const editButton = document.createElement("button");
            editButton.classList.add("editEntry");
            editButton.textContent = "Düzenle";
            editButton.addEventListener("click", function () {
                editEntry(index);
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteEntry");
            deleteButton.textContent = "Sil";
            deleteButton.addEventListener("click", function () {
                deleteEntry(entry.timestamp);
            });

            listItem.appendChild(entryText);
            listItem.appendChild(entryDate);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            entryList.appendChild(listItem);
        });
    }

    // Günlük girişi ekle
    function addEntry(text) {
        const entry = {
            text: text,
            timestamp: Date.now(),
        };
        entries.push(entry);
        updateLocalStorage();
        displayEntries();
        entryInput.value = "";
    }

    // Günlük girişi düzenle
    function editEntry(index) {
        const newText = prompt("Girişi düzenle:", entries[index].text);
        if (newText !== null) {
            entries[index].text = newText;
            entries[index].timestamp = Date.now(); // Tarihi güncelle
            updateLocalStorage();
            displayEntries();
        }
    }

    // Günlük girişi sil
    function deleteEntry(timestamp) {
        entries = entries.filter(function (entry) {
            return entry.timestamp !== timestamp;
        });
        updateLocalStorage();
        displayEntries();
    }

    // Local storage'ı güncelle
    function updateLocalStorage() {
        localStorage.setItem("entries", JSON.stringify(entries));
    }

    // Unix zaman damgasını biçimlendirme
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('tr-TR', options);
    }

    // Form submit olayını dinle
    addEntryBtn.addEventListener("click", function () {
        const text = entryInput.value.trim();
        if (text !== "") {
            addEntry(text);
        }
    });

    // Sayfa yüklendiğinde günlük girişlerini göster
    displayEntries();
});
