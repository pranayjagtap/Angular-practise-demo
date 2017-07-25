package hibernate_project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class flex_details {
	@Id
	private int flex_id;
	private String name;
	public int getUser_id() {
	return flex_id;
	}
	public void setUser_id(int flex_id) {
	this.flex_id = flex_id;
	}
	public String getName() {
	return name;
	}
	public void setName(String name) {
	this.name = name;
	}


}
