trigger ContactTrigger on Contact(after insert, before update, after update) {
  if (Trigger.isUpdate) {
    for (Contact c : Trigger.new) {
      Contact oldContact = Trigger.oldMap.get(c.Id);
      if (Trigger.isBefore) {
        // Force the field to stay checked if it was changed
        if (oldContact.DoNotCall == true && c.DoNotCall == false) {
          c.DoNotCall = true;
        }
      } else {
        // Add the number to the DNC list if DoNotCall was checked during this update
        if (oldContact.DoNotCall == false && c.DoNotCall == true) {
          // Add the number using our class
          DoNotCallManager.addPhoneNumber(c.Phone);
        }
      }
    }
  }

  // Add the number to the DNC list if DoNotCall is checked
  if (Trigger.isInsert && Trigger.isAfter) {
    for (Contact c : Trigger.new) {
      if (c.DoNotCall == true) {
        DoNotCallManager.addPhoneNumber(c.Phone);
      }
    }
  }
}
