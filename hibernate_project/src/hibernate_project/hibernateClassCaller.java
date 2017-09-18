package hibernate_project;

import java.io.IOException;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
//comment lol
import hibernate_project.dto.flex_details;

public class hibernateClassCaller {
	public static void main(String args[])throws IOException{
System.gc();
	flex_details det = new flex_details();
	try{
	det.setUser_id(3);
	det.setName("Pranay Jagtap Intelligent Coder");
	SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
	Session session= sessionFactory.openSession();
	session.beginTransaction();
	session.saveOrUpdate(det);
	session.getTransaction().commit();
	System.out.println("This is do able");
	}
	catch(Exception e){
		
		System.out.println("Table exists- Updating/inserting entry");
	}
	
	}
}

