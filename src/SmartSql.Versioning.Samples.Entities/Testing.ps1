
$Headers = @{"Content-Type" = "application/json"}

$EntityName = "Original Person"

$Items = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/List"
$Person = $Items | Where-Object {$_.Name -eq $EntityName }


if (!$Person) {
    $Person = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/Add" -Headers $Headers -Body (ConvertTo-Json @{
        Values = @{
            Name = $EntityName;
        };
    }) 
}

$Person

$UpdatedPerson = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/Update" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        InstanceId = $Person.InstanceId;
    }
    Values = @{
        Name = "Updated Person: $(Get-Date)";
    };
}) 

$UpdatedPerson

$History = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/History" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        InstanceId = $Person.InstanceId;
    }
}) 

$History





$GovernmentIdentifications = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/List" -Headers $Headers

$GovernmentIdentifications

$SSN = $GovernmentIdentifications | Where-Object {$_.Name -eq "Social Security Number"}

if (!$SSN) {
    $SSN = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/Add" -Headers $Headers -Body (ConvertTo-Json @{
        EntityId = $Tony.InstanceId;
        Name = "Social Security Number";
        Value = "555-55-5555";
    }) 

    $SSN = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/Update" -Headers $Headers -Body (ConvertTo-Json @{
        EntityId = $Tony.InstanceId;
        InstanceId = $SSN.InstanceId;
        Name = "Social Security Number";
        Value = "888-88-8888";
    }) 

}

















