let addAdminTags = false;

function formatSpecificFormat(userList) {
    let newLine = "";
    let isAdmin = false;

    userList.split('\n').forEach(line => {
        let lineString = line.trim();

        if (lineString === "Authorized Users:") {
            isAdmin = false;
            return;
        }

        if (lineString === "Authorized Administrators:") {
            isAdmin = true;
            return;
        }

        if (lineString.includes("password: ")) {
            return;
        }
        if (lineString === "</pre>") {
            return;
        }
        if (lineString === "<pre>") {
            return;
        }
        if (!lineString) {
            return;
        }

        lineString = lineString.replace(" (you)", "");

        if (isAdmin && addAdminTags) {
            lineString += " [Admin]";
        }

        newLine += lineString + "\n";
    });

    return newLine;
}

function formatMergedFormat(allUsers, isAdminList) {
    let newLine = "";

    allUsers.split(/\s+/).forEach(userName => {
        let formattedName = userName.trim();

        if (formattedName) {
            let isAdmin = isAdminList.split(/\s+/).includes(formattedName);

            formattedName = formattedName.replace(" (you)", "");

            if (isAdmin && addAdminTags) {
                formattedName += " [Admin]";
            }

            newLine += formattedName + "\n";
        }
    });

    return newLine.trim();
}

function processSpecificFormat() {
    let userInput = document.getElementById("specificFormatInput").value;
    let formattedOutput = formatSpecificFormat(userInput);
    document.getElementById("specificFormattedOutput").value = formattedOutput;
}

function processMergedFormat() {
    let allUsersInput = document.getElementById("allUsersInput").value;
    let adminListInput = document.getElementById("adminListInput").value;

    let formattedOutput = formatMergedFormat(allUsersInput, adminListInput);
    document.getElementById("mergedFormattedOutput").value = formattedOutput;
}

function toggleAdminTags() {
    addAdminTags = !addAdminTags;
    document.getElementById("adminTagsButton").innerText = addAdminTags ? "Admin Tags: ON" : "Admin Tags: OFF";
}
