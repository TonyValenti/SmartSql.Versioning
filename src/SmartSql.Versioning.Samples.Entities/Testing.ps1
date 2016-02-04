
$Headers = @{"Content-Type" = "application/json"}

$EntityName = "Original Person"

$AllPeople = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/List"
$Person = $AllPeople | Where-Object {$_.Name -eq $EntityName }

$Person = $AllPeople | Select-Object -Last 1


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

$Person = $UpdatedPerson

$History = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/History" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        InstanceId = $Person.InstanceId;
    }
}) 

$History





$GovernmentIdentifications = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/List" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        EntityId = $Person.InstanceId;
    }
})

$GovernmentIdentifications

$SSN = $GovernmentIdentifications | Where-Object {$_.Name -eq "Social Security Number"} | Select-Object -First 1
$SSN

if (!$SSN) {
    $SSN = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/Add" -Headers $Headers -Body (ConvertTo-Json @{
        Key = @{
            EntityId = $Person.InstanceId;
        }
        Values = @{
            Name = "Social Security Number";
            Value = "555-55-5555";
        }
    }) 
    $SSN


    $SSN = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/GovernmentIdentificationApi/Update" -Headers $Headers -Body (ConvertTo-Json @{
        Key = @{
            InstanceId = $SSN.InstanceId;
        }
        Values = @{
            Name = "Social Security Number";
            Value = "888-88-8888";
        }
    }) 
    $SSN


}



$DateOfBirth = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/DateOfBirthApi/Get" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        EntityId = $Person.InstanceId;
    }
})

if ($DateOfBirth) {
    $DateOfBirth
}



$DateOfBirth = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/DateOfBirthApi/Update" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        EntityId = $Person.InstanceId;
    }
    Values = @{
        Value = "1980-01-01";
    }
})




$Details = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/Details" -Headers $Headers -Body (ConvertTo-Json @{
    Key = @{
        InstanceId = $Person.InstanceId;
    }
})
$Details










