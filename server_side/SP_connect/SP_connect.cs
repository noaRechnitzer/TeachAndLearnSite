using System.Data;
using System.Data.SqlClient;

namespace SP_connect;

public class SP_connect
{
    string connectionString = "server=NOA;database=myDataBase_1;trusted_connection=true;TrustServerCertificate=true;";
    int returnValue = 0;
    public SP_connect(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public SqlDataReader spGetCoursesByLecture(int id)
    {

        SqlConnection connection = new SqlConnection(connectionString);


        SqlCommand command = new SqlCommand();
        command.Connection = connection;
        command.CommandType = CommandType.StoredProcedure;
        command.CommandText = "spGetCoursesByLecture";
        SqlParameter param = new SqlParameter("@LectureId", id);
        param.Direction = ParameterDirection.Input; // Or Output if the procedure returns a value through that parameter
        command.Parameters.Add(param);

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();
        
        return reader;
    }

    public SqlDataReader spGetCategoriesForCourse(int id)
    {

        SqlConnection connection = new SqlConnection(connectionString);

        SqlCommand command = new SqlCommand();
        command.Connection = connection;
        command.CommandType = CommandType.StoredProcedure;
        command.CommandText = "spGetCategoriesForCourse";
        SqlParameter param = new SqlParameter("@courseId", id);
        param.Direction = ParameterDirection.Input; // Or Output if the procedure returns a value through that parameter
        command.Parameters.Add(param);

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();

        return reader;
    }
    public SqlDataReader use_SP(int id,string params_name,string sp_name)
    {

        SqlConnection connection = new SqlConnection(connectionString);

        SqlCommand command = new SqlCommand();
        command.Connection = connection;
        command.CommandType = CommandType.StoredProcedure;
        command.CommandText = sp_name;
        SqlParameter param = new SqlParameter(params_name, id);
        param.Direction = ParameterDirection.Input; // Or Output if the procedure returns a value through that parameter
        command.Parameters.Add(param);

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();

        return reader;
    }
}

