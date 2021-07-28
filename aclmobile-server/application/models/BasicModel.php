<?php
defined('BASEPATH') or exit('No direct script access allowed');

class BasicModel extends CI_Model
{
    public function myConstruct($db_name = true)
    {
        parent::__construct();
        $this->db = $this->load->database($db_name, TRUE);
    }

    public function getAll($table)
    {
        return $this->db->get($table);
    }

    public function getLike($table, $column, $value)
    {
        $this->db->like($column, $value);
        return $this->db->get($table);
    }

    public function getFirst($table)
    {
        $this->db->limit(1, 0);
        $this->db->order_by('created_at', 'asc');
        return $this->db->get($table)->row();
    }

    public function getOne($table, $column, $id)
    {
        $this->db->limit(1, 0);
        $this->db->where($column, $id);
        return $this->db->get($table)->row();
    }

    public function getTotalData($table)
    {
        return $this->db->count_all($table);
    }

    public function getTotalDataWhere($table, $column, $value)
    {   
        $this->db->where($column, $value);
        return $this->db->count_all_results($table);
    }

    public function getWhere($table, $where)
    {
        return $this->db->get_where($table, $where);
    }

    public function getLimit($table, $where, $limit)
    {
        $this->db->limit($limit, 0);
        return $this->db->get_where($table, $where);
    }

    public function whereIn($table, $column, $data)
    {
        $this->db->where_in($column, $data);
        return $this->db->get($table);
    }

    public function getById($table, $id)
    {
        return $this->db->get_where($table, array('id' => $id))->row();
    }

    public function create($table, $data)
    {
        $this->db->insert($table, $data);
        return $this->db->insert_id();
    }

    public function createMultiple($table, $data)
    {
        return $this->db->insert_batch($table, $data);
    }

    public function updateById($table, $id, $data)
    {
        $this->db->where('id', $id);
        $this->db->update($table, $data);
        return $this->db->get_where($table, ['id' => $id])->row();
    }

    public function update($table, $column, $fill, $data)
    {
        $this->db->where($column, $fill);
        $this->db->update($table, $data);
        return $this->db->get_where($table, [$column => $fill])->row();
    }

    public function updateMultiple($table, $data, $column)
    {
        return $this->db->update_batch($table, $data, $column);
    }

    public function deleteById($table, $id)
    {
        return $this->db->delete($table, array('id' => $id));
    }

    public function delete($table, $where)
    {
        return $this->db->delete($table, $where);
    }

    public function deleteMultiple($table, $column, $id)
    {
        $this->db->where_in($column, $id);
        return $this->db->delete($table) ? true : false;
    }

    public function deleteMultipleWithColumn($table, $single = [], $multiple = [])
    {
        $singleLength = count($single);
        $multipleLength = count($multiple);

        if($singleLength > 0) {
            foreach($single as $skey => $sval){
                $this->db->where($skey, $sval);
            }
        }

        if($multipleLength > 0) {
            foreach ($array as $akey => $aval) {
                $this->db->where_in($akey, $aval);
            }
        }

        if($singleLength === 0 && $multipleLength === 0) {
            return "deleteMultipleWithColumn butuh setidaknya 1 parameter";
        } else {
            return $this->db->delete($table);
        }
    }

    public function truncate($table)
    {
        return $this->db->truncate($table);
    }
}