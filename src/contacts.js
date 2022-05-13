function addContacts(contactItems, offset) {
  const contacts = document.getElementsByClassName('contacts')[0];
  const end = offset + 10000;
  if (end > 50000) {
    return;
  }

  for (let i = offset; i < end; i++) {
    const child = document.createElement("div");
    child.textContent = i;
    child.classList.add("contact");
    contactItems.push(child);
  }
  contacts.append(...contactItems.slice(offset, contactItems.length));
}

function addContactsLazyLoad() {
  const contacts = document.getElementsByClassName("contacts")[0];
  const stickyHeader = document.getElementsByClassName("stickyHeader")[0];

  const ITEM_HEIGHT = 18.4;
  const ONE_LOAD_CONTACTS_HEIGHT = ITEM_HEIGHT * 10000;

  const items = [];
  let offset = 0;
  let updateHeight = ITEM_HEIGHT * 5000;

  addContacts(items, offset);

  contacts.addEventListener("scroll", (e) => {
    const itemIndex = Math.round(contacts.scrollTop / ITEM_HEIGHT);
    if (items[itemIndex]) {
      stickyHeader.textContent = items[itemIndex].textContent;
    }
  });
  
  contacts.addEventListener('scroll', (e) => {
    if (contacts.scrollTop > updateHeight) {
      offset += 10000;
      updateHeight += ONE_LOAD_CONTACTS_HEIGHT;

      addContacts(items, offset);
    }
  });
}

addContactsLazyLoad();